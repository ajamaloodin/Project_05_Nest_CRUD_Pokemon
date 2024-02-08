import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor (private readonly pokemonService: PokemonService,
               private readonly http: AxiosAdapter,) {}
  
  async runSeed() {

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    const createPokemonDto = new CreatePokemonDto();

    data.results.forEach(({name, url}) => {

      //El url contiene el nro del pokemon. Entonces separamos todas las palabras.
      const segments = url.split('/');
      //en la penultima posición está el numero
      const num = +segments[ segments.length - 2 ];
      
      createPokemonDto.name = name;
      createPokemonDto.num = num;

      this.pokemonService.create( createPokemonDto );
      
    })

    return 'Finish loading data process';
  }
}
