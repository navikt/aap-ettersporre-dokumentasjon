import { isMock, logger } from '@navikt/aap-felles-innbygger-utils';
import { proxyApiRouteRequest } from '@navikt/next-api-proxy';
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuthenticatedApi } from '../../lib/auth/withAuth';

export interface EttersporrDokumentasjonRequest {
  fnr: string;
  dokumentasjonstype: string;
}

const handler = withAuthenticatedApi(
  async (req: NextApiRequest, res: NextApiResponse, accessToken: string) => {
    if (isMock()) {
      logger.info('Mocket request, returnerer 200 OK');
      res.status(200).json({});
    }

    logger.info('token fra AAD: ' + accessToken);

    const bearerToken = await grantAzureOboToken(
      accessToken,
      'api://dev-gcp.aap.soknad-api/.default'
    );

    logger.info('bearer token: ' + bearerToken);

    if (isInvalidTokenSet(bearerToken)) {
      if (bearerToken.error instanceof Error) {
        logger.error(new Error(bearerToken.message, { cause: bearerToken.error }));
      } else {
        logger.error(`${bearerToken.errorType}: ${bearerToken.message}`);
      }
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }

    try {
      await proxyApiRouteRequest({
        hostname: 'https://aap-soknad-api.dev.intern.nav.no',
        path: '/sb/vedlegg',
        req,
        res,
        bearerToken,
      });
    } catch (error: unknown) {
      logger.error(error);
      res.status(500).json({ message: 'Unable to proxy request' });
    }
  }
);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default handler;
