import { isMock, logger } from '@navikt/aap-felles-innbygger-utils';
import { validateAzureToken } from '@navikt/next-auth-wonderwall';
import { NextApiRequest, NextApiResponse } from 'next';

type ApiHandler<Response> = (
  req: NextApiRequest,
  res: NextApiResponse<Response>,
  accessToken: string
) => void | Promise<unknown>;

export function withAuthenticatedApi<Response>(
  handler: ApiHandler<Response | { message: string }>
): ApiHandler<Response | { message: string }> {
  return async function withBearerTokenHandler(req, res) {
    if (isMock()) {
      logger.info(
        'Kjører i mocket miljø, dropper validering av token for API. Skal ikke skje i prod.'
      );
      return handler(req, res, 'fakte-token');
    }
    const bearerToken: string | null | undefined = req.headers['authorization'];

    if (!bearerToken) {
      logger.warn('Ingen token i request');
      res.status(401).json({ message: 'Access denied' });
      return;
    }

    const tokenValidationResult = await validateAzureToken(bearerToken);
    if (tokenValidationResult !== 'valid') {
      logger.info(
        `Ugyldig JWT token for API request til sti ${req.url} (${tokenValidationResult.errorType} ${tokenValidationResult.message})`
      );
      res.status(401).json({ message: 'Access denied' });
      return;
    }

    return handler(req, res, bearerToken?.replace('Bearer ', ''));
  };
}
