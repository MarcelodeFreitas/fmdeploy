function CardItem(props) {
    return (
        <>
            <li className="cards__item">
                <a className="cards__item__link" href={props.path} target="_blank" rel="noreferrer">
                    <figure className="cards__item__pic-wrap" 
                    data-category={props.label}>
                        <img src={props.src} alt="logs" 
                        className="cards__item__img"/>
                    </figure>
                </a>
            </li>
        </>
    )
}

export default CardItem
