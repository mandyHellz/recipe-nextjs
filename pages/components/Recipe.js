import React from 'react';

// 6- criando o componente Recipe 
const Recipe = ({title, calories, image, ingredients}) => { 
    // 8 - trazer os dados que escolhemos trazer da API e passar para as props
    // do componente Recipe

    return(
        <div className=" max-w-full text-center md:mx-20 my-10 bg-red-300 rounded-lg p-4">
            <img className=" m-auto " src={image}/>
            <h1 className="text-center text-lg font-bold ">{title}</h1>
            <p className=" text-center ">cals: {calories}</p>
            <ol className=" text-center italic ">
                {// fazemos um map em cada ingrediente (pois são vários em uma única 
                 //receita e queremos trazer todos por loop)
                    ingredients.map(ingredient => (
                        <li>{ingredient.text}</li>
                ))}
            </ol>
        </div>
    );
}

export default Recipe;