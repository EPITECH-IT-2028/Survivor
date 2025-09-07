"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Users, Search } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
}

const contacts: Contact[] = [
  { id: '1', name: 'John Doe', lastMessage: 'Hello there!', lastMessageTime: '14:30' },
];

const messages: Message[] = [
  { id: '1', text: 'Hello World', time: '14:25', isOwn: false },
  { id: '2', text: 'Test', time: '14:26', isOwn: true },
];

export function MessagesStartup() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-225 mt-10">
      <div className="flex-1 flex gap-3 max-w-7xl mx-auto w-full">
        {/* Contacts */}
        <Card className="w-80 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contacts
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="space-y-1 p-2 max-h-96 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${selectedContact?.id === contact.id ? 'bg-muted' : ''
                    }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{contact.name}</p>
                      <div className="flex items-center gap-2">
                        {contact.lastMessageTime && (
                          <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                        )}
                      </div>
                    </div>
                    {contact.lastMessage && (
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 p-4 overflow-y-auto max-h-200">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                      {!message.isOwn && (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-muted text-xs">
                            {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`px-4 py-2 rounded-2xl ${message.isOwn
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                        }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-background ">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 rounded-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && messageText.trim()) {
                      setMessageText('');
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="rounded-full px-4"
                  disabled={!messageText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card >
      </div >
    </div >
  );
}
