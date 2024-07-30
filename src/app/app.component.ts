import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from '@google/generative-ai';
import { environment } from '../environments/environment.development';
// import { FileConversionService } from './file-conversion-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {

  // constructor(private fileConversionService: FileConversionService) { }

  title = 'google-ai-gemini-angular';


   genAI = new GoogleGenerativeAI(environment.API_KEY);
 generationConfig = {
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
  temperature: 0.9,
  top_p: 1,
  top_k: 32,
  maxOutputTokens: 100, // limit output
};
 model = this.genAI.getGenerativeModel({
  model: 'gemini-pro', // or 'gemini-pro-vision'
  ...this.generationConfig,
});

async TestGeminiPro() {
  // Model initialisation missing for brevity

  const prompt = 'What are you doing?';
  const result = await this.model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text());
}

// async TestGeminiProVisionImages() {
//   try {
//     let imageBase64 = await this.fileConversionService.convertToBase64(
//       'assets/baked_goods_2.jpeg'
//     );
  
//     // Check for successful conversion to Base64
//     if (typeof imageBase64 !== 'string') {
//       console.error('Image conversion to Base64 failed.');
//       return;
//     }
//     // Model initialisation missing for brevity
//     let prompt = [
//       {
//         inlineData: {
//           mimeType: 'image/jpeg',
//           data: imageBase64,
//         },
//       },
//       {
//         text: 'Provide a recipe.',
//       },
//     ];
//     const result = await this.model.generateContent(prompt);
//     const response = await result.response;
//     console.log(response.text());
//   } catch (error) {
//     console.error('Error converting file to Base64', error);
//   }
// }

// async TestGeminiProChat() {
//   // Model initialisation missing for brevity
  
//   const chat = this.model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: "Hi there!",
//       },
//       {
//         role: "model",
//         parts: "Great to meet you. What would you like to know?",
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 100,
//     },
//   });
//   const prompt = 'What is the largest number with a name? Brief answer.';
//   const result = await chat.sendMessage(prompt);
//   const response = await result.response;
//   console.log(response.text());
//   }

// async TestGeminiProStreaming() {
//   // Model initialisation missing for brevity
  
//   const prompt = {
//     contents: [
//       {
//         role: 'user',
//         parts: [
//           {
//             text: 'Generate a poem.',
//           },
//         ],
//       },
//     ],
//   };
//   const streamingResp = await this.model.generateContentStream(prompt);
//   for await (const item of streamingResp.stream) {
//     console.log('stream chunk: ' + item.text());
//   }
//   console.log('aggregated response: ' + (await streamingResp.response).text());
// }



  ngOnInit(): void {
    // Google AI
    this.TestGeminiPro();
    //this.TestGeminiProChat();
    //this.TestGeminiProVisionImages();
    //this.TestGeminiProStreaming();
    
    // Vertex AI
    //this.TestGeminiProWithVertexAIViaREST();
  }
  
}
