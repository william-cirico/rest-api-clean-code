import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 256,
        unique: true
    })
    email: string;

    @Column({
        length: 20
    })
    password: string;

    @Column({
        length: 11
    })
    cpf: string;

    @Column({
        length: 20,
    })
    phone: string;
}