import { Test, TestingModule } from '@nestjs/testing';
import { Species } from './models/species.model';
import { SpeciesService } from './species.service';
import { getModelToken } from '@nestjs/sequelize';

const speciesArray = [
  {
    familyNameId: 1,
    nativeHabitatId: 1,
    name: 'any name',
    commonName: 'any common name',
    tag: 'plant',
    image: 'https://loremflickr.com/640/480?lock=2874895916597248',
  },
  {
    familyNameId: 2,
    nativeHabitatId: 2,
    name: 'any name',
    commonName: 'any common name',
    tag: 'plant',
    image: 'https://loremflickr.com/640/480?lock=2874895916597248',
  },
];

const oneSpecies = {
  familyNameId: 1,
  nativeHabitatId: 1,
  name: 'any name',
  commonName: 'any common name',
  tag: 'plant',
  image: 'https://loremflickr.com/640/480?lock=2874895916597248',
};

describe('SpeciesService', () => {
  let service: SpeciesService;
  let model: typeof Species;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: getModelToken(Species),
          useValue: {
            findAll: jest.fn(() => speciesArray),
            count: jest.fn(() => speciesArray.length),
            findOne: jest.fn(),
            create: jest.fn(() => oneSpecies),
            remove: jest.fn(),
            destroy: jest.fn(() => oneSpecies),
          },
        },
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
    model = module.get<typeof Species>(getModelToken(Species));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a species', () => {
      const oneSpecies = {
        familyNameId: 1,
        nativeHabitatId: 1,
        name: 'any name',
        commonName: 'any common name',
        tag: 'plant',
        image: 'https://loremflickr.com/640/480?lock=2874895916597248',
      };
      expect(
        service.create({
          familyNameId: 1,
          nativeHabitatId: 1,
          name: 'any name',
          commonName: 'any common name',
          tag: 'plant',
          image: 'https://loremflickr.com/640/480?lock=2874895916597248',
        }),
      ).toEqual(oneSpecies);
    });
  });

  describe('findAll()', () => {
    it('should return an array of species', async () => {
      const species1 = await service.findAll(
        { 
          page: 1, 
          perPage: 10, 
          fieldId: '1', 
          valueId: '2',
          search: 'any'
        }
      );

      const species2 = await service.findAll(
        { 
          page: 1, 
          perPage: 10, 
          fieldId: '2', 
          value: 'any',
          search: 'any'
        }
      );
      
      const species3 = await service.findAll(
        { 
          page: 1, 
          perPage: 10, 
          fieldId: '3', 
          valueId: '2',
          search: 'any'
        }
      );

      const species4 = await service.findAll(
        { 
          page: 1, 
          perPage: 10, 
          fieldId: '4', 
          valueId: '2',
          search: 'any'
        }
      );

      const speciesDefault = await service.findAll(
        { 
          page: 1, 
          perPage: 10, 
          fieldId: 'any', 
          valueId: '2',
          search: 'any'
        }
      );

      expect(species1.data).toEqual(speciesArray);
      expect(species1.total).toEqual(speciesArray.length);

      expect(species2.data).toEqual(speciesArray);
      expect(species2.total).toEqual(speciesArray.length);

      expect(species3.data).toEqual(speciesArray);
      expect(species3.total).toEqual(speciesArray.length);

      expect(species4.data).toEqual(speciesArray);
      expect(species4.total).toEqual(speciesArray.length);

      expect(speciesDefault.data).toEqual(speciesArray);
      expect(speciesDefault.total).toEqual(speciesArray.length);
    });
  });

  describe('findOne()', () => {
    it('should get a single species', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne('1'));
      expect(findSpy).toBeCalledWith({ where: { id: '1' } });
    });
  });

  describe('remove()', () => {
    it('should remove a species', async () => {
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const retVal = await service.remove('2');
      expect(findSpy).toBeCalledWith({ where: { id: '2' } });
      expect(retVal).toBeUndefined();
    });
  });
});
