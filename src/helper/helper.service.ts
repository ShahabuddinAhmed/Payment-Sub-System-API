import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { DeviceType, DeviceKey } from '../utils/utils.enum';

@Injectable()
export class HelperService {
    constructor() {}

    public async getDeviceType(req: any): Promise<string> {
        let deviceType = DeviceType.WEB;

        switch (req.headers["st-access"]) {
            case DeviceKey.ANDROID:
                deviceType = DeviceType.ANDROID;
                break;
            case DeviceKey.IOS:
                deviceType = DeviceType.IOS;
                break;
        }
        return deviceType;
    };

    public async offsetLimitParser(offset = 0, limit = 25): Promise<{ offset: number; limit: number }> {
		offset = offset < 0 ? 0 : offset;
		limit = limit <= 0 ? 25 : limit > 25 ? 25 : limit;
		return { offset, limit };
	};

    public getUniqueToken(length: number): string {
        return crypto.randomBytes(length).toString('hex');
    }
}
