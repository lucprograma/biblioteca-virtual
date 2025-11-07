import TagsForm from '../components/tags/TagsForm';

const Tags = () => {

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 65,
                paddingBottom: 40
            }}
        >     
        
            <div
                className="row g-4"
                style={{
                    paddingBottom: 40,
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: 'grey',
                    borderRadius: 20,
                    width: 615
                }}
            >

                <h4 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'white',
                    borderBottom: '2px solid gray',
                    paddingBottom: 26
                    }}
                >
                    Gestión de etiquetas
                </h4>             

                <TagsForm />

            </div>
        </div>

    )

}

export default Tags;