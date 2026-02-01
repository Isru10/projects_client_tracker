import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
    @Prop({ required: true })
    name: string;

    @Prop()
    email?: string;

    @Prop()
    notes?: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
