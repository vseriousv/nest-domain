import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserTypes } from '../../../shared/enum/userTypes';

export type IpsDocument = Ips & Document;

@Schema()
export class Ips {
	// @Prop({
	// 	index: true
	// })
	// _id: string

	@Prop()
	idExchange: string;

	@Prop()
	ip: string;

	@Prop()
		// tslint:disable-next-line:variable-name
	ip_country: boolean;

	@Prop()
		// tslint:disable-next-line:variable-name
	user_agent: string;

	@Prop()
	timestamp: Date;

}

export const IpsSchema = SchemaFactory.createForClass(Ips);
