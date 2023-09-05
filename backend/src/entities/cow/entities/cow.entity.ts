import { Record } from "src/entities/record/entities/record.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Cow {
    @PrimaryColumn()
    caravana: string;

    @Column()
    name: number;

    @Column()
    breed: string;

    @OneToMany(() => Record, (record) => record.cow)
    records: Record[];
}
