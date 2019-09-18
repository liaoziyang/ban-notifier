/**
 * Payload to be signed into a JWT
 */
export interface JwtPayload {
    /**
     * Username the user registered with
     */
    username: string;
}
