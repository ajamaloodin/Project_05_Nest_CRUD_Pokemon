import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    //Id será el que genera Mongo
    @Prop({
        unique: true,
        index : true,
    })
    name: string;

    @Prop({
        unique: true,
        index : true,
    })
    num: number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon);
