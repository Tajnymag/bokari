import { Customer, Person } from '@bokari/entities';
import { plainToClass } from 'class-transformer';
import { Authorized, Body, Get, HttpCode, JsonController, Param, Post } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { getRepository } from 'typeorm';

import { CustomerInsertable } from './schemas';

@Authorized()
@JsonController('/customers')
export class CustomersController {
	@Get()
	@ResponseSchema(Customer, { isArray: true })
	async getAllCustomers(): Promise<Customer[]> {
		const customers = await getRepository(Customer).find({
			relations: ['person', 'person.contacts', 'contracts']
		});

		return customers;
	}

	@Get('/:id')
	@ResponseSchema(Customer)
	async getCustomerById(@Param('id') id: number): Promise<Customer> {
		const customer = await getRepository(Customer).findOneOrFail(id, {
			relations: ['person', 'person.contacts', 'contracts']
		});

		return customer;
	}

	@Post()
	@HttpCode(201)
	@ResponseSchema(CustomerInsertable, { statusCode: 201 })
	async createCustomer(@Body() desiredCustomer: CustomerInsertable): Promise<Customer> {
		const customerEntity = plainToClass(Customer, desiredCustomer);

		const createdCustomer = await getRepository(Customer).save(customerEntity);

		return createdCustomer;
	}
}
