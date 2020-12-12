import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiKeyEntity } from '../../api-keys/entities/api-key.entity';
import { ApikeyExchangeStatusTypes } from '../../../shared/enum/apikeyExchangeStatusTypes';

@Table({
	tableName: 'apikey_exchange_broker',
})
export class ApikeyExchangeBrokerOrmEntity extends Model<ApikeyExchangeBrokerOrmEntity> {
	@Column({
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ForeignKey(() => ApiKeyEntity)
	@Column({ field: 'api_key_id' })
	apiKeyId: number;

	@Column
	status: ApikeyExchangeStatusTypes;


	@CreatedAt
	@Column({ field: 'created_at' })
	createdAt: Date;

	@CreatedAt
	@Column({ field: 'updated_at' })
	updatedAt: Date;

	@BelongsTo(() => ApiKeyEntity)
	apiKeyObject: ApiKeyEntity;
}
