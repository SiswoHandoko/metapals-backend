import { Test, TestingModule } from '@nestjs/testing';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

const createSpeciesDto: CreateSpeciesDto = {
  familyNameId: 1,
  nativeHabitatId: 1,
  name: 'any name',
  commonName: 'any common name',
  tag: 'plant',
  image: 'https://loremflickr.com/640/480?lock=2874895916597248',
};

describe('SpeciesController', () => {
  let speciesController: SpeciesController;
  let speciesService: SpeciesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [
        {
          provide: SpeciesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((species: CreateSpeciesDto) =>
                Promise.resolve({ id: '1', ...species }),
              ),
            findAll: jest.fn().mockResolvedValue({
              data:[
                {
                  dataValues: {
                    id: 1,
                    familyNameId: 1,
                    nativeHabitatId: 1,
                    name: 'any name',
                    commonName: 'any common name',
                    tag: 'plant',
                    image: 'https://loremflickr.com/640/480?lock=2874895916597248',
                  },
                },
                {
                  dataValues: {
                    id: 2,
                    familyNameId: 2,
                    nativeHabitatId: 2,
                    name: 'any name',
                    commonName: 'any common name',
                    tag: 'plant',
                    image: 'https://loremflickr.com/640/480?lock=2874895916597248',
                  },
                },
              ],
              total:2
            }),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                familyNameId: 1,
                nativeHabitatId: 1,
                name: 'any name',
                commonName: 'any common name',
                tag: 'plant',
                image: 'https://loremflickr.com/640/480?lock=2874895916597248',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    speciesController = app.get<SpeciesController>(SpeciesController);
    speciesService = app.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(speciesController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a species', () => {
      expect(speciesController.create(createSpeciesDto)).resolves.toEqual({
        id: '1',
        ...createSpeciesDto,
      });
      expect(speciesService.create).toHaveBeenCalled();
      expect(speciesService.create).toHaveBeenCalledWith(createSpeciesDto);
    });
  });

  describe('findAll()', () => {
    it('should find all species ', async () => {
      await speciesController.findAll({page:'1',perPage:'10',fieldId:'2',valueId:'2',value:'any',search:'any'});
      await speciesController.findAll({page:'1',perPage:'10',fieldId:null,valueId:null,value:null,search:null});
      expect(speciesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a species', () => {
      speciesController.findOne('1');
      expect(speciesService.findOne).toHaveBeenCalled();
      expect(speciesController.findOne('1')).resolves.toEqual({
        familyNameId: 1,
        nativeHabitatId: 1,
        name: 'any name',
        commonName: 'any common name',
        tag: 'plant',
        image: 'https://loremflickr.com/640/480?lock=2874895916597248',
        id: '1',
      });
    });
  });

  describe('remove()', () => {
    it('should remove the species', () => {
      speciesController.remove('2');
      expect(speciesService.remove).toHaveBeenCalled();
    });
  });
});
