import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity()

export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: "用户名" })
    username: string;

    @Column({ comment: "邮箱" })
    email: string;

    @Column({ comment: "密码" })
    password: string;

    async comparePassword(attempa: string) {
        return await bcrypt.compare(attempa, this.password)
    }
}