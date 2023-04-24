import { useState } from "react";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from 'axios';
import { Synonyms } from "../model";
import Results from './Results';



const Searchbar = () => {
    const [word, setWord] = useState<string>('');

    const [placeholder, setPlaceholder] = useState<string>('Enter word here...');

    const [enabled, setEnabled] = useState(false);
    const { data, isLoading, isError, error, refetch } = useQuery<AxiosResponse<Synonyms[], any>, Error>(
        'synonyms', 
        () => axios.get<Synonyms[]>(`https://api.datamuse.com/words?ml=${word}`),
        {
            enabled
        }
    );

    return ( 
        <>
            <div className="Searchbar--search">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    word.length !== 0 ? setEnabled(true) : setPlaceholder("Please enter word...");
                    refetch();
                }}>
                    <input 
                        className="Searchbar--text-field"
                        type="text"
                        placeholder={placeholder}
                        name="wordSearchbar"
                        onChange={(e) => setWord(e.target.value)}
                        value={word}
                    />
                    <button className="Searchbar--button">Search</button>
                </form>
            </div>
            {
                isLoading && <h2 className='Results--no-word'>Loading...</h2>
            }
            {
                isError && <h2 className='Results--no-word'>{error.message}</h2>
            }
            {data && 
                <Results 
                    data={data.data}
                />
            }
        </>
     );
}
 
export default Searchbar;