import { Record } from "src/entities/record/entities/record.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CreateCowDto } from "../dto/create-cow.dto";

@Entity()
export class Cow {
    @PrimaryColumn()
    caravana: string;

    @Column()
    breed: string;

    @OneToMany(() => Record, (record) => record.cow)
    records: Record[];

    constructor(dto: CreateCowDto) {
        console.log(dto);
        
        for(let key in dto) {
            this[key] = dto[key];
        }
    }
}
