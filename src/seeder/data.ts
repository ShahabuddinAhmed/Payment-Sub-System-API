import { DiscountType } from '../utils/utils.enum';

export const data = [
    {	id: 1,
        name: 'Grocery',
        productCode: '5824d675ee1d45509db268e7ca6ade0f',
        parentID: null,
        discount: 12,
        discountType: DiscountType.Percentage
    },
	{	id: 2,
        name: 'Food',
        productCode: '7b952ad1b8bc465cb746d2fe41803e41',
        parentID: 1,
        discount: 0,
        discountType: DiscountType.Flat
    },
	{
		id: 3,
        name: 'Snacks',
        productCode: 'a4def1759c724f40ad3081671302cd4f',
        parentID: 2,
        discount: 0,
        discountType: DiscountType.Flat
    },
	{
		id: 4,
        name: 'Frozen',
        productCode: '002e3c5828f543f299045f7c8e2182e5',
        parentID: 2,
        discount: 6,
        discountType: DiscountType.Percentage
    },
	{	id: 5,
        name: 'Rice',
        productCode: '25038b03b1914d67abbb9bc1f87ec415',
        parentID: 1,
        discount: 120,
        discountType: DiscountType.Flat
    },
	{
		id: 6,
        name: 'Electronics',
        productCode: '371828b4abee403baaf45151d3cf5102',
        parentID: null,
        discount: 0,
        discountType: DiscountType.Flat
    },
	{
		id: 7,
        name: 'Desktop',
        productCode: '634d56a110a5435d97dd7601c2bd97ff',
        parentID: 6,
        discount: 5,
        discountType: DiscountType.Percentage
    },
	{
		id: 8,
        name: 'Laptop',
        productCode: '6402458dd62a4d9e96fa7c3f026b9bed',
        parentID: 6,
        discount: 0,
        discountType: DiscountType.Flat
    },
	{
		id: 9,
        name: 'Luggage',
        productCode: '26b1ac9af43946c88dc03f8517dc8009',
        parentID: null,
        discount: 16,
        discountType: DiscountType.Percentage
    }
];