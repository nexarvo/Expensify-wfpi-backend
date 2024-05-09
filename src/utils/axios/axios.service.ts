import {WinstonLogger} from '../logger/WinstonLogger';
import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {AxiosResponse} from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import {Stopwatch} from '../dates/stopwatch.helper';

@Injectable()
export class AxiosService {
    constructor(private readonly _logger: WinstonLogger) {
        this._logger.setScope(__filename);
    }

    async get<T = any>(url: string, headers?: any, params?: any): Promise<AxiosResponse<T>> {
        try {
            this._logger.info(`Executing get http request with Url: ${url}`);

            const stopwatch = new Stopwatch();
            stopwatch.start(); // Start the stopwatch

            const response = await axios.get(url, {
                headers: headers,
                params: params,
            });

            const elapsedTime = stopwatch.stop(); // Stop the stopwatch

            this._logger.info(`Successfully executed get http request with Url: ${url}, In ${elapsedTime}ms`);

            return response;
        } catch (ex) {
            this._logger.info(`Failed to execute get http request with Url: ${url}, ErrorMessage: ${ex.message}`);
            return ex?.response;
        }
    }

    async post(url: string, data: any, config: any): Promise<AxiosResponse> {
        try {
            this._logger.info(`Executing post http request with Url: ${url}`);

            const stopwatch = new Stopwatch();
            stopwatch.start(); // Start the stopwatch

            const response = await axios.post(url, data, config);

            const elapsedTime = stopwatch.stop(); // Stop the stopwatch

            this._logger.info(`Successfully executed post http request with Url: ${url}, In ${elapsedTime}ms`);

            return response;
        } catch (ex) {
            this._logger.info(`Failed to execute post http request with Url: ${url}, ErrorMessage: ${ex.message}`);
            return ex?.response;
        }
    }

    async delete<T = any>(url: string, headers?: any, body?: any): Promise<AxiosResponse<T>> {
        try {
            this._logger.info(`Executing delete http request with Url: ${url}`);

            const stopwatch = new Stopwatch();
            stopwatch.start(); // Start the stopwatch

            const response = await axios.delete<T>(url, {
                headers: headers,
                data: body || null,
            });

            const elapsedTime = stopwatch.stop(); // Stop the stopwatch

            this._logger.info(`Successfully executed delete http request with Url: ${url}, In ${elapsedTime}ms`);

            return response;
        } catch (ex) {
            this._logger.info(`Failed to execute delete http request with Url: ${url}, ErrorMessage: ${ex.message}`);
            return ex?.response;
        }
    }
}
