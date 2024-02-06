import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { STATUS_CODES } from 'http';

@Injectable()
export class PokemonService {

  constructor (
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>  ) {

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error) {

      this.handleExceptions( error, 'create' );

    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon;

    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({num: term});
    }

    //Validar mongo Id
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`There is no any Poke with id: ${term}`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne ( term );

    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    //el segundo argumento indica si se quiere que regrese en nuevo objeto que 
    //grabó en la BD
    try {
      await pokemon.updateOne( updatePokemonDto );
    //exparse el pokemon recibido y lo sobreescribe en el updatePokemonDto
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {

      this.handleExceptions( error, 'update' );
    }
  }

  async remove(id: string) {
    
    // const pokemon = await this.findOne ( id );
    // await pokemon.deleteOne();
    // return { id };
    // Esto haría un solo acceso a la BD: 
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    //Tenemos el problema donde si el id no existe, igual devuelve un 200
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0 ) {
      throw new BadRequestException(`This id: ${ id } was not found`);
    }

    return `Pokemon ${ id } has left the building`;
    
  }

  private handleExceptions( error: any, oper: string ) {

    if (error.code  === 11000){
      throw new BadRequestException(`This poke already exist ${JSON.stringify( error.keyValue )}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can not ${oper} Poke. Check srv logs`);

  }
}
