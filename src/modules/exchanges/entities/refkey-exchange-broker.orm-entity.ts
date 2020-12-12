import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApikeyExchangeStatusTypes } from '../../../shared/enum/apikeyExchangeStatusTypes';
import { RefKeyEntity } from '../../ref-keys/entities/ref-key.entity';

@Table({
	tableName: 'refkey_exchange_broker',
})
export class RefkeyExchangeBrokerOrmEntity extends Model<RefkeyExchangeBrokerOrmEntity> {
	@Column({
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ForeignKey(() => RefKeyEntity)
	@Column({ field: 'ref_key_id' })
	refKeyId: number;

	@Column
	status: ApikeyExchangeStatusTypes;


	@CreatedAt
	@Column({ field: 'created_at' })
	createdAt: Date;

	@CreatedAt
	@Column({ field: 'updated_at' })
	updatedAt: Date;

	@BelongsTo(() => RefKeyEntity)
	refKeyObject: RefKeyEntity;
}
