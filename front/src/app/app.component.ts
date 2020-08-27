import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from './chat.service';
import { User, Message, Actions } from './classes.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasGivenName = false;
  time: number = Date.now();
  user: User = {
    id: null,
    name: null
  };
  // TODO: Shown user list needs to come from server
  usernames = [];
  users: User[] = [];
  messages: Message[] = [];
  message: string;
  messageId: string;
  action = Actions;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();
    this.chatService.onNewMessage().subscribe((message: Message) => {
      console.log('listening to messages', message)
      this.messages.unshift(message);

      if (message.action === 0) {
        this.users.push({
          id: message.from.id,
          name: message.from.name
        });
      }

    });
    // this.chatService.onUserJoined().subscribe((userName) => {
    //   this.usernames.push(userName);
    // });

  }

  createRandomId = (): number =>  Math.floor(Math.random() * 10000); 

  /**
   * Click handler for new user enter button
   */
  onUserEnter(form: NgForm) {
    console.log('Let me in!', this.hasGivenName);
    this.user.name = form.value.username;
    this.user.id = this.createRandomId();
    console.log('user: ', this.user.name);
    this.userJoined(this.user);
    this.hasGivenName = true;
  }

  /**
   * Event handler for new user joining chat space
   */
  userJoined(user: User) {
    const userJoined: Message = {
      id: this.messageId,
      message: '',
      action: Actions.JOINED,
      from: user
    };
    this.chatService.sendMessage(userJoined);
    // this.chatService.addUserToList(this.user.name);
  }

  /**
   * Click handler for send message button
   */
  onSend() {
    const id = this.createRandomId().toString();
    const userMessage: Message = {
      id: id,
      message: this.message,
      action: Actions.MESSAGE,
      from: this.user
    };
    this.chatService.sendMessage(userMessage)
    this.message = '';
  }

}
