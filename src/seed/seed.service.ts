import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  
  async runSeed() {

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1');

    data.results.forEach(({name, url}) => {

      //El url contiene el nro del pokemon. Entonces separamos todas las palabras.
      const segments = url.split('/');
      //en la penultima posición está el numero
      const num = +segments[ segments.length - 2 ];

     
      
      
    })

    return data.results;
  }
}
