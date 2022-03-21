import { Project } from './Project'

const Projects = ({ projects, infoLevel, actionButtons, onDelete, handlePrivacy }) => {

    return (
        <>
            {projects.map( (project) => (
                <Project key={project.project_id} project={project} infoLevel={infoLevel} actionButtons={actionButtons} onDelete={onDelete} handlePrivacy={handlePrivacy}/>
            ))}
        </>
    )
}

export default Projects
