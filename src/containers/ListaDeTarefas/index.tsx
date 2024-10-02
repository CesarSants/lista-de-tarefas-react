import { useSelector } from 'react-redux'
// import { Titulo } from '../../components/Tarefa/styles'

import Tarefa from '../../components/Tarefa'
// import * as S from './styles'
import { Container } from './styles'
// import * as enums from '../../utils/enums/Tarefa'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { tarefas } = useSelector((state: RootReducer) => state)

  return (
    <Container>
      <p>
        2 tarefas marcadas como: &quot;categoria&ldquo; e &quot;termo&ldquo;
      </p>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              descricao={t.descricao}
              prioridade={t.prioridade}
              status={t.status}
              titulo={t.titulo}
            />
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default ListaDeTarefas
