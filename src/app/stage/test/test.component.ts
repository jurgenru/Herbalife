import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  test: any =[
    {
      question: "¿Necesitas estar seguro de que algo va a funcionar antes de intentarlo?",
      optionA: "Si mi instinto dice que sí, puedo implementar una idea rápidamente aunque sea algo radical que no hecho antes.",
      optionB: "Soy una persona que planifica todo y necesito examinar cada detalle antes de actuar, Es una manera para incrementar  la posibilidad de éxito.",
      optionC: "Siempre tengo nuevas ideas pero no las hago realidad hasta no probarlas bien.",
    },
    {
      question: "¿Cómo te sientes cuando sabes que no eres la persona más inteligente del grupo?",
      optionA: "Bien. Pienso que la gente más inteligente podrá hacer las cosas que yo no puedo.",
      optionB: "Me afecta un poco al ego, pero lo maneo bien.",
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
      optionA: "",
      optionB: "",
      optionC: "",
    },
    {
      question: "¿Cómo describes tus hábitos de gastos personales?",
      optionA: "",
      optionB: "",
      optionC: "",
    },
    {
      question: "Si alguien expresa interés e trabajar contigo, ¿Cómo le hacs siguimiento?",
      optionA: "",
      optionB: "",
      optionC: "",
    },
    {
      question: "¿Alguna vez has trabajado en ventas?",
      optionA: "",
      optionB: "",
      optionC: "",
    },
    {
      question: "¿En qué tipo de ambiente trabajas mejor?",
      optionA: "",
      optionB: "",
      optionC: "",
    },
    {
      question: "¿Si estás trabajando en un proyecto con un plazo apretado y aparece otro proyecto con un plazo más apretado aún, ¿Cómo lo manejas?",
      optionA: "",
      optionB: "",
      optionC: "",
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
