import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

export enum ProjectStatus {
    PLANNING = 'Planning',
    IN_PROGRESS = 'In Progress',
    BLOCKED = 'Blocked',
    COMPLETED = 'Completed',
}

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
    clientId: Types.ObjectId;

    @Prop({ required: true, enum: ProjectStatus, default: ProjectStatus.PLANNING })
    status: ProjectStatus;

    @Prop()
    description?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
