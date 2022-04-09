import React from 'react'
import './contactPage.scss';
import { Link } from "react-router-dom";
import Btn from '../Btn/Btn';
import team1 from '../../assets/team1.png';
import team2 from '../../assets/team2.png';
import team3 from '../../assets/team3.png';
import team4 from '../../assets/team4.png';
import team5 from '../../assets/team5.png';

const ContactPage  = () => {
    return (  
        <div className='contact'>
            <div className='contact__container'>

                <h3 className='contact__title'>Équipe du projet O'rganizer</h3>

                <div className='contact__members'>
                    <div className='contact__member'>
                        <img className='contact__member-avatar' src={team1}  alt='Guillaume Royer'/>
                        <p className='contact__member-name'>Guillaume Royer</p>
                        <p className='contact__member-position'>Project Manager / Scrum Master</p>
                    </div>
                    <div className='contact__member'>
                        <img className='contact__member-avatar' src={team2}  alt='Ludovic Rougier'/>
                        <p className='contact__member-name'>Ludovic Rougier</p>
                        <p className='contact__member-position'>Lead Dev Back</p>
                    </div>
                    <div className='contact__member'>
                        <img className='contact__member-avatar' src={team3}  alt='Mustapha Hamadi'/>
                        <p className='contact__member-name'>Mustapha Hamadi</p>
                        <p className='contact__member-position'>Lead Dev Front</p>
                    </div>
                    <div className='contact__member'>
                        <img className='contact__member-avatar' src={team4}  alt='Chloé Thomas'/>
                        <p className='contact__member-name'>Chloé Thomas</p>
                        <p className='contact__member-position'>Référente technique React</p>
                    </div>
                    <div className='contact__member'>
                        <img className='contact__member-avatar' src={team5}  alt='Hassane Toure'/>
                        <p className='contact__member-name'>Hassane Toure</p>
                        <p className='contact__member-position'>Référent technique Git</p>
                    </div>
                </div>

                <div className='contact__button'>
                    <Link to="/"> 
                        <Btn text='Retour' variant='contained' color='primary'/>
                    </Link>
                </div>
            </div>
        </div>   
    );
};

export default ContactPage;
