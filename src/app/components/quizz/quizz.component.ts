import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{

selectOption(value:string) {
  this.answer.push(value)
  this.nextStep()
  console.log(this.answer)
}

async nextStep(){
  this.qIndex += 1
  if (this.qMaxIndex > this.qIndex) {
    this.questionsSelected = this.questions[this.qIndex]
  } else {
    const finalAnswer:string = await this.checkResult(this.answer)
    this.finish = true
    this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]

  }
}

async checkResult(answer:string[]){
  const result = answer.reduce((previous, current, i, arr)=>{
    if (arr.filter(item=> item === previous).length >
        arr.filter(item=> item === current).length) {
          return previous
    } else {
      return current
    }
  })
  return result
}

title:string = ""
questions:any
questionsSelected:any
answer:string[] = []
answerSelected:string = ""

qIndex:number = 0
qMaxIndex:number = 0

finish:boolean= false

  constructor(){

  }

  ngOnInit(): void {

    if(quizz_questions){
      this.finish = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionsSelected = this.questions[this.qIndex]
      this.qIndex = 0
      this.qMaxIndex = this.questions.length

      console.log(this.qIndex)
      console.log(this.qMaxIndex)
    }
  }

}
