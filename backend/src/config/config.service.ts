import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

/**
 * .env config
 */
export interface EnvConfig {
    [key: string]: string;
}

/**
 * Handle configuration values
 */
export class ConfigService {
    /**
     * Holds the env config
     */
    private envConfig: EnvConfig;

    /**
     * Reads the .env file
     * @param filePath
     */
    constructor(filePath: string) {
        let config;
        if (filePath) {
            config = dotenv.parse(fs.readFileSync(filePath));
        }
        this.envConfig = this.validateInput(config);
    }

     /**
      * Ensures all needed variables are set, and returns the validated JavaScript object
      * including the applied default values.
      * @param envConfig 
      */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test')
                .default('development'),
            PORT: Joi.number().default(3000),
            PG_USER: Joi.string().required(),
            PG_PW: Joi.string().required(),
            PG_DB: Joi.string().required(),
            PG_HOST: Joi.string().default('localhost'),
            PG_PORT: Joi.number().default(5432),
            JWT_SECRET: Joi.string().required(),
            FACEIT_API: Joi.string().required(),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    /**
     * Get a config value
     * @param key 
     */
    get(key: string): string {
        return this.envConfig[key];
    }
}
