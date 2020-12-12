import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEntity } from '../enitities/currency.entity';

export class CurrencyDto {

  @ApiProperty({
    description: 'Currency short name | currency symbol'
  })
  readonly symbol: string;

  @ApiProperty({
    description: 'Has this currency extra id parameter'
  })
	readonly hasExtraId: boolean;

  @ApiProperty({
    description: 'Name of extra id (if exists)'
  })
	readonly extraId: string;

  @ApiProperty({
    description: 'Currency name'
  })
	readonly name: string;

  @ApiProperty({
    description: 'Informational messages about the currency they are changing'
  })
	readonly warningsFrom: string[];

  @ApiProperty({
    description: 'Informational messages about the currency for which they are exchanged'
  })
	readonly warningsTo: string[];

  @ApiProperty({
    description: 'RegExr validation address'
  })
	readonly validationAddress: string;

  @ApiProperty({
    description: 'Additional verification'
  })
	readonly validationExtra: string;

  @ApiProperty({
    description: 'Explorer address'
  })
	readonly addressExplorer: string;

  @ApiProperty({
    description: 'Hash of the transaction in the blockchain explorer'
  })
	readonly txExplorer: string;

  @ApiProperty()
	readonly confirmationsFrom: string | number;

  @ApiProperty()
  image: string;

	constructor(
		name: string,
		symbol: string,
		hasExtraId: boolean,
		extraId: string,
		warningsFrom: string[],
		warningsTo: string[],
		validationAddress: string,
		validationExtra: string,
		addressExplorer: string,
		txExplorer: string,
		confirmationsFrom: string | number,
		image: string,
	) {
		this.name = name;
		this.symbol = symbol;
		this.hasExtraId = hasExtraId;
		this.extraId = extraId;
		this.image = image;
		this.warningsFrom = warningsFrom;
		this.warningsTo = warningsTo;
		this.validationAddress = validationAddress;
		this.validationExtra = validationExtra;
		this.addressExplorer = addressExplorer;
		this.txExplorer = txExplorer;
		this.confirmationsFrom = confirmationsFrom;
	}

}
