import { User, UserInsertable } from '@bokari/shared';
import { db } from './db';

export class UsersService {
	static async createUser(user: UserInsertable) {
		return db.user.create({
			data: {
				username: user.username,
				person: {
					create: {
						name: user.name
					}
				},
				wages: {
					create: {
						createdById: 0,
						monetaryValue: {
							create: {
								amount: user.wage.amount,
								currency: {
									connect: {
										isoCode: user.wage.currency
									}
								}
							}
						}
					}
				}
			}
		});
	}
}