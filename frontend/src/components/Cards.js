import CardItem from './CardItem'
import './Cards.css'

export const Cards = () => {
    return (
        <div className='cards'>
            <div className='cards__title'>
                CONTRIBUTORS
            </div>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                        src={window.location.origin + "/images/um-logo.png"}
                        text="University of Minho is a Public Foundation 
                        governed by private law, under the legal Regime of 
                        Higher Education Institutes.​​​​​"
                        label="University of Minho"
                        path="https://www.uminho.pt/EN"
                        />
                        <CardItem 
                        src={window.location.origin + "/images/algoritmi.png"}
                        text="Centro ALGORITMI is a research unit of the School 
                        of Engineering – University of Minho, that develops R&D 
                        activity in Information and Communications Technology and
                         Electronics &#40;ICT&E&#41;."
                        label="Centro Algoritmi"
                        path="https://algoritmi.uminho.pt/"
                        />
                        <CardItem 
                        src={window.location.origin + "/images/aarhus.png"}
                        text="Established in 1928, Aarhus University has since 
                        developed into a major Danish university with a strong 
                        international reputation across the entire research 
                        spectrum."
                        label="AARHUS University"
                        path="https://international.au.dk/"
                        />
                        <CardItem 
                        src={window.location.origin + "/images/mib.png"}
                        text="Center for Music in the Brain is a Center of 
                        Excellence funded by the Danish National Research
                        Foundation."
                        label="MIB Center for Music in the Brain"
                        path="https://musicinthebrain.au.dk/"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
