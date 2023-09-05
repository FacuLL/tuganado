import { Cow } from "src/entities/cow/entities/cow.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Record {
    @PrimaryColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column()
    shift: number;

    @Column()
    amount: number;

    @ManyToOne(() => Cow, (cow) => cow.records)
    @JoinTable()
    cow: Cow;
}
