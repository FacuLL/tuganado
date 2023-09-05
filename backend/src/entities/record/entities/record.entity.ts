import { Cow } from "src/entities/cow/entities/cow.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CreateRecordDto } from "../dto/create-record.dto";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column({ default: 0 })
    shift: number;

    @Column({ default: 0 })
    amount: number;

    @ManyToOne(() => Cow, (cow) => cow.records,
    {onDelete: "CASCADE",
    onUpdate: "CASCADE"})
    @JoinTable()
    cow: Cow;

    constructor(dto: CreateRecordDto, cow: Cow) {
        for(let key in dto) {
            this[key] = dto[key];
        }
        this.date = new Date();
        this.cow = cow;
    }
}
