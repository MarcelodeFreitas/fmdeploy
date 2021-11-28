import { Model } from './Model'

const Models = ({ models, infoLevel, actionButtons, onDelete, handlePrivacy }) => {

    return (
        <>
            {models.map( (model) => (
                <Model key={model.ai_id} model={model} infoLevel={infoLevel} actionButtons={actionButtons} onDelete={onDelete} handlePrivacy={handlePrivacy}/>
            ))}
        </>
    )
}

export default Models
