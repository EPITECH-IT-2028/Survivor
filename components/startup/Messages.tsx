"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Send, Users, Search, Plus, UserPlus } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { TContact } from '@/app/types/contacts';
import { TMessage } from '@/app/types/messages';
import { TUserMessage } from '@/app/types/users';
import { getMessagesBetweenUsers } from '@/app/hooks/messages/getMessages';
import { getContacts } from '@/app/hooks/contacts/getContacts';
import { insertMessage } from '@/app/hooks/messages/insertMessage';
import { searchUsersFromQuery } from '@/app/hooks/users/searchUsers';
import { insertContact } from '@/app/hooks/contacts/insertContact';

export function MessagesStartup() {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState<TContact | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [contacts, setContacts] = useState<TContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  const [showAddContact, setShowAddContact] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [searchResults, setSearchResults] = useState<TUserMessage[]>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchContacts = async () => {
    if (!user?.id)
      return;

    try {
      const res = await getContacts(user.id);
      setContacts(res);
      if (res.length > 0 && !selectedContact) {
        setSelectedContact(res[0]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    if (!user?.id || !selectedContact)
      return;

    try {
      const res = await getMessagesBetweenUsers(user.id, selectedContact.contact_id);
      setMessages(res);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !user?.id || !selectedContact || sendingMessage)
      return;

    setSendingMessage(true);
    try {
      const res = await insertMessage(user.id, selectedContact.contact_id, messageText.trim());

      if (res) {
        setMessageText('');
        await fetchMessages();

      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setSendingMessage(false);
  };

  const searchUsers = async (searchTerm: string) => {
    if (!searchTerm.trim() || !user?.id)
      return;

    setSearchingUsers(true);
    try {
      const res = await searchUsersFromQuery(user.id, searchTerm);
      setSearchResults(res);
    } catch (error) {
      console.error('Error searching users:', error);
    }
    setSearchingUsers(false);
  };

  const addContact = async (contactUserId: number) => {
    if (!user?.id)
      return;

    try {
      const res = await insertContact(user.id, contactUserId);

      if (res) {
        setShowAddContact(false);
        setUserSearch('');
        setSearchResults([]);
        await fetchContacts();
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getUserInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(n => n.charAt(0).toUpperCase()).join('').slice(0, 2);
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  useEffect(() => {
    if (selectedContact) {
      setInterval(() => {
        fetchMessages();
      }, 10000);
      fetchMessages();
    }
  }, [selectedContact, user]);

  useEffect(() => {
    if (userSearch.trim()) {
      searchUsers(userSearch);
    } else {
      setSearchResults([]);
    }
  }, [userSearch]);

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full my-10">
      <div className="flex-1 flex gap-3 max-w-7xl mx-auto w-full px-4">
        {/* Contacts */}
        <Card className="w-80 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contacts
              </CardTitle>
              <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a contact</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    {searchingUsers && <div className="text-center text-sm text-muted-foreground">Searching...</div>}
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {searchResults.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
                          <Avatar className="h-10 w-10">
                            {user.image && <AvatarImage src={user.image} alt={user.name} />}
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Button size="sm" onClick={() => addContact(user.id)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
              {filteredContacts.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground p-4">
                  {contacts.length === 0 ? 'No contacts found' : 'No contacts match your search.'}
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${selectedContact?.id === contact.id ? 'bg-muted' : ''
                      }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        {contact.image && <AvatarImage src={contact.image} alt={contact.name} />}
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getUserInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">{contact.name}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        {selectedContact.image && <AvatarImage src={selectedContact.image} alt={selectedContact.name} />}
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getUserInitials(selectedContact.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {(
                      messages.map((message) => {
                        const isOwn = message.sender_id === user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'
                              }`}>
                              {!isOwn && (
                                <Avatar className="h-6 w-6">
                                  {selectedContact.image && <AvatarImage src={selectedContact.image} alt={selectedContact.name} />}
                                  <AvatarFallback className="bg-muted text-xs">
                                    {getUserInitials(selectedContact.name)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className={`px-4 py-2 rounded-2xl ${isOwn
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-muted rounded-bl-md'
                                }`}>
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {formatMessageTime(message.created_at)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 rounded-full"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && messageText.trim() && !sendingMessage) {
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      className="rounded-full px-4"
                      disabled={!messageText.trim() || sendingMessage}
                      onClick={sendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Choose a contact</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
