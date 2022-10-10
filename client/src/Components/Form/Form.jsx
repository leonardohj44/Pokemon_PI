import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from '../../Redux/Actions';
import Swal from 'sweetalert2';  
import { NavBar } from '../NavBar/NavBar';
import styles from './Form.module.css'

export function Form() {
    const dispatch = useDispatch();
    const typesPoke = useSelector(state => state.types); 

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    const saveOk =(timer)=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Pokemon has been saved',
            showConfirmButton: false,
            timer: timer
        })
    }

    const [disable, setDisable] = useState(true);

    const [formInput, setFormInput] = useState({
        name: "",
       image: "",
       life: 0,
       attack: 0,
       defense: 0,
       speed: 0,
       height: 0,
       weight: 0,
       types: []
    });

    const [errors, setErrors] = useState({}); // -- setErrors({})

    //regular expressions
    const regExp = {
    name: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\-., ]{5,30}$/,
    image:  /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
    }

    //error alerts
    const alerts = {
    name: "Name between 5 and 30 characters",
    image: "insert an URL",
    life: "between 1-4440",
    attack: "between 1-210",
    defense: "between 1-260",
    speed: "between 1-120",
    weight: "between 1-2500",
    height: "between 1-250"
    }

    // validation
    function validate (value){ // value is the object with inputs ---> {}
        let errors = {};
        if(!regExp.name.test(value.name)){ // --> if value does not meet this condition... then
            errors.name = alerts.name;
        }
        if(value.life > 4440 || value.life < 1 || !value.life) errors.life = alerts.life;              
        if(value.attack > 210 || value.attack < 1 || !value.attack) errors.attack = alerts.attack;
        if(value.defense > 260 || value.defense < 1 || !value.defense) errors.defense = alerts.defense;
        if(value.speed > 120 || value.speed < 1 || !value.speed) errors.speed = alerts.speed;
        if(value.weight > 2500 || value.weight < 1 || !value.weight) errors.weight = alerts.weight;
        if(value.height > 250 || value.height < 1 || !value.height) errors.height = alerts.height;
        return errors; // --> errors is an object whose value will be assigned to the state errors 
    }

    function handleInputChange (e) {
        e.preventDefault();
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate ({
            ...formInput,
            [e.target.name]: e.target.value
         })
        )
        setDisable(false)
    }

    function handleSelect (e){
        setFormInput({
            ...formInput,
            types: [...formInput.types, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(formInput));
        setFormInput({
            name: "",
           image: "",
           life: 0,
           attack: 0,
           defense: 0,
           speed: 0,
           height: 0,
           weight: 0,
           types: []
        })
        setDisable(true)
    }

    function deleteSelectedType(value){
        setFormInput({
            ...formInput,
            types: [...formInput.types.filter(e => {return e !== value})]
        })
    }


    return (
        <>
        <NavBar/>
        <div className={styles.container}>
            <h2>CREATE YOUR POKEMON</h2>
                <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputCont}>
                    <label htmlFor = "name" >Name&nbsp;&nbsp;&nbsp;: </label>
                        <input 
                            className={styles.name}
                            id="name"
                            type="text"
                            name="name"
                            value={formInput.name}
                            onChange={handleInputChange}
                            placeholder="Pokemon name"
                            autoComplete='off'
                            required
                        />
                        
                        <br/>
                </div>
                <div>
                    {errors.name ? <span className={styles.errors}>{errors.name}</span>: null}
                </div>
                
                
                <div className={styles.inputCont}>
                    <label htmlFor = "image" >Image&nbsp;&nbsp;&nbsp;: </label>
                    <input 
                        className={styles.image}
                        id="image"
                        type="text"
                        name="image"
                        value={formInput.image}
                        onChange={handleInputChange}
                        placeholder="Ex: https://host.com/photo.jpg"
                        autoComplete='off'
                        //required
                    />
                    <br/>
                </div>
                <div>
                     {errors.image ? <span className={styles.errors}>{errors.image}</span>: null}
                </div>

            <div className={styles.ranges}>
                <div className={styles.inputCont}>
                    <label htmlFor = "life" >Life&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                    <input 
                        className={styles.input}
                        id="life"
                        type="number"
                        name="life"
                        value={formInput.life}
                        onChange={handleInputChange}
                        min={1}
                        max={4440}
                        required
                    />
                    <br/>
                    {errors.life ? <span className={styles.errors}>{errors.life}</span>: null}
                </div>

                <div className={styles.inputCont}> 
                <label htmlFor = "attack" >Attack&nbsp;&nbsp;&nbsp;: </label>
                    <input 
                        className={styles.input}
                        id="attack"
                        type="number"
                        name="attack"
                        value={formInput.attack}
                        onChange={handleInputChange}
                        min={1}
                        max={210}
                        required
                    />
                    <br/>
                    {errors.attack ? <span className={styles.errors}>{errors.attack}</span>: null}
                </div>
                
                <div className={styles.inputCont}>
                    <label htmlFor = "defense" >Defense:</label>
                    <input 
                        className={styles.input}
                        id="defense"
                        type="number"
                        name="defense"
                        value={formInput.defense}
                        onChange={handleInputChange}
                        min={1}
                        max={260}
                        required
                    />
                    <br/>
                    {errors.defense ? <span className={styles.errors}>{errors.defense}</span>: null}
                </div>

                <div className={styles.inputCont}>
                    <label htmlFor = "speed" >Speed&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                    <input 
                        className={styles.input}
                        id="speed"
                        type="number"
                        name="speed"
                        value={formInput.speed}
                        onChange={handleInputChange}
                        min={1}
                        max={120}
                        required
                    />
                    <br/>    
                    {errors.speed ? <span className={styles.errors}>{errors.speed}</span>: null}
                </div>

                </div>

                <div className={styles.inputCont}>
                    <label htmlFor = "weight" >Weight&nbsp;&nbsp;: </label>
                    <input 
                        className={styles.input}
                        id="weight" 
                        type="number" 
                        name="weight"
                        value={formInput.weight}
                        onChange={handleInputChange}
                        min={1}
                        max={2500}
                        required
                    />
                    <br/>
                    {errors.weight ? <span className={styles.errors}>{errors.weight}</span>: null}
                </div>

                <div className={styles.inputCont}>
                    <label htmlFor = "height" >Height&nbsp;&nbsp;&nbsp;: </label>
                    <input 
                        className={styles.input}
                        id="height" 
                        type="number" 
                        name="height"
                        value={formInput.height}
                        onChange={handleInputChange}
                        min={1}
                        max={2500}
                        required
                    /> 
                    <br/>
                    {errors.height ? <span className={styles.errors}>{errors.height}</span>: null}
                </div>
                    
                <div className={styles.inputCont}>
                        <label htmlFor = "types" >Select types: </label>
                        <select name= "types" id="types" onChange={handleSelect} className={styles.selectTypes}>
                            {typesPoke.map(e => 
                                (<option key={e.key} value={e.name}>{e.name}</option>)
                                )}
                        </select>
                        
                        <br/>
                </div>
                <div className={styles.selected}>
                            {formInput.types.map((t) => (
                                <div className={styles.containerType}>
                                    <span className={styles.close} onClick={() => deleteSelectedType(t)}>X</span>
                                    {t}
                                </div>
                            ))}
                </div>

                    <button type="submit" name="submit" className={styles.btn} onClick={() => saveOk(3000)}
                        disabled = {disable === false && Object.entries(errors).length === 0 ? false: true}>CREATE POKEMON   
                    </button>
            </form>
            </div>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    )
}