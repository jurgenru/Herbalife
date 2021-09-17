import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: any = [
    {
      question: "¿Necesitas estar seguro de que algo va a funcionar antes de intentarlo?",
      optionA: "Si mi instinto dice que sí, puedo implementar una idea rápidamente aunque sea algo radical que no hecho antes.",
      optionB: "Soy una persona que planifica todo y necesito examinar cada detalle antes de actuar, Es una manera para incrementar  la posibilidad de éxito.",
      optionC: "Siempre tengo nuevas ideas pero no las hago realidad hasta no probarlas bien.",
    },
    {
      question: "¿Cómo te sientes cuando sabes que no eres la persona más inteligente del grupo?",
      optionA: "Bien. Pienso que la gente más inteligente podrá hacer las cosas que yo no puedo.",
      optionB: "Me afecta un poco al ego, pero lo manejo bien.",
      optionC: "Casi siempre soy la persona más inteligente.",
    },
    {
      question: "¿Cómo es tu conducta en la oficina?",
      optionA: "Generalmente estoy feliz pero me altero si tengo que trabajar hasta tarde y no puedo hacer mis cosas personales.",
      optionB: "Amo lo que hago y siempre estoy de buen ánimo, mis colegas dicen que es una actitud contagiosa.",
      optionC: "No expreso cómo me siento, sea bien o mal , lo guardo en mi interior.",
    },
    {
      question: "¿Cómo reaccionas cuando fallas?",
      optionA: "Soy cauteloso por naturaleza porque el fracaso me afecta. He abandonado proyectos cuando he visto que no funcionan.",
      optionB: "El fracaso me sacude pero sigo adelante, no hay nada más que pueda hacer.",
      optionC: "Es un golpe, pero es la manera más poderosa de aprender.",
    },
    {
      question: "¿Cada cuánto tiempo aprendes algo nuevo?",
      optionA: "Todos los días. Dedico tiempo a leer o a tomar cursos gratis por internet para conocer áreas que son nuevas para mí.",
      optionB: "Cada semana. Aprendo cosas nuevas viendo la televisión o navegando en internet.",
      optionC: "Cada mes por que trabajo mucho tiempo.",
    },
    {
      question: "¿Cómo te relacionas con otros?",
      optionA: "Me gusta un ambiente donde conecto, con gente dentro y fuera de mi campo de trabajo. Cada encuentro es una oportunidad para intercambiar ideas. Además uso de redes sociales en internet",
      optionB: "Los contactos me parecen un poco superficiales, prefiero discusiones reales que se den de manera natural",
      optionC: "Uso de redes sociales en internet y reparto mis tarjetas de presentación en reuniones.",
    },
    {
      question: "¿Cuál es tu idea de diversión después de un largo día?",
      optionA: "Ir a conocer un nuevo restaurante.",
      optionB: "Ver mis programas de televisión favoritos.",
      optionC: "Hacer algún deporte con un amigo.",
    },
    {
      question: "¿Cómo describes tus hábitos de gastos personales?",
      optionA: "Aunque tenga dinero extra prefiero ahorraro que gastarlo.",
      optionB: "Cubro mis gastos fijos y deudas. Lo que me sobra lo gasto como quiero",
      optionC: "Vivo y gasto en el momento, el dinero no se irá conmigo",
    },
    {
      question: "Si alguien expresa interés en trabajar contigo, ¿Cómo le haces siguimiento?",
      optionA: "Soy persistente por teléfono, por correo o en persona. El contacto constante da resultado.",
      optionB: "Le busco una o dos veces por semana, no quiero ser una molestia.",
      optionC: "Una vez después de un contacto inicial, luego dejo que venga a mí.",
    },
    {
      question: "¿Alguna vez has trabajado en ventas?",
      optionA: "Sí. Me gustó con clientes, conocer sus necesidad y satisfacerlas con los productos que mejor les servían.",
      optionB: "Sí. Me fue bien pero el concepto de ventas me parece un poco manipulador.",
      optionC: "No. La presión de vender una cantidad determinada en un tiempo límite no me gusta.",
    },
    {
      question: "¿En qué tipo de ambiente trabajas mejor?",
      optionA: "Soy productivo en un ambiente estructurado, con objetivos, cronogramas y tiempos límites claros.",
      optionB: "Me gusta hacer varias cosas a la vez  y es mejor si puedo hacerlas según mis propios términos.",
      optionC: "Es mejor si un superior me desafía a alcanzar mi mejor potencial.",
    },
    {
      question: "¿Si estás trabajando en un proyecto con un plazo apretado y aparece otro proyecto con un plazo más apretado aún, ¿Cómo lo manejas?",
      optionA: "Cambio mi cronograma sobre la marcha para terminar los dos a tiempo.",
      optionB: "Pido más tiempo para el segundo proyecto.",
      optionC: "Le digo al cliente que no tenemos el tiempo necesario para cumplir.",
    },
  ];
  currentTest = 0;
  result = false;

  constructor() { }

  ngOnInit(): void {
  }

  nextTest(option: any) {
    setTimeout(() => {
      this.currentTest++;
      if (this.currentTest == 12) {
        this.result = true;
      }
      console.log(this.currentTest);
      console.log('respuesta', option);
    }, 2000);
  }
}
