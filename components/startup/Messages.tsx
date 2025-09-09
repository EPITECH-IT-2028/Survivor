"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send, Users, Search, Plus, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { TContact } from "@/app/types/contacts";
import { TMessage } from "@/app/types/messages";
import { TUserMessage } from "@/app/types/users";
import { getMessagesBetweenUsers } from "@/app/hooks/messages/getMessages";
import { getContacts } from "@/app/hooks/contacts/getContacts";
import { insertMessage } from "@/app/hooks/messages/insertMessage";
import { searchUsersFromQuery } from "@/app/hooks/users/searchUsers";
import { insertContact } from "@/app/hooks/contacts/insertContact";
import supabase from "@/lib/supabase-client";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
      setLoading(false);
    };
    fetchData();

    const channel = supabase
      .channel("messages_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          console.log("new message:", payload);

          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new as TMessage]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => prev.map(msg =>
              msg.id === payload.new.id ? payload.new as TMessage : msg
            ));
          } else if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
          }
        },
      )
      .subscribe();
    console.log("Subscribed to messages_channel");

    return () => {
      channel.unsubscribe();
      console.log("Unsubscribed from messages_channel");
    };
  }, []);

  const sendMessage = async () => {
    if (!messageText.trim() || !user?.id || !selectedContact || sendingMessage)
      return;

    setSendingMessage(true);
    try {
      const res = await insertMessage(user.id, selectedContact.contact_id, messageText.trim());

      if (res) {
        setMessageText('');
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
    if (userSearch.trim()) {
      searchUsers(userSearch);
    } else {
      setSearchResults([]);
    }
  }, [userSearch]);

  if (loading) {
    return <div className="flex h-96 items-center justify-center">Loading...</div>;
  }

  return (
    <div className="my-10 flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-3 px-4">
        {/* Contacts */}
        <Card className="flex w-80 flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5" />
                Contacts
              </CardTitle>
              <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <UserPlus className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a contact</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    {searchingUsers && <div className="text-center text-sm text-muted-foreground">Searching...</div>}
                    <div className="max-h-60 space-y-2 overflow-y-auto">
                      {searchResults.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                          <Avatar className="size-10">
                            {user.image && <AvatarImage src={user.image} alt={user.name} />}
                            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Button size="sm" onClick={() => addContact(user.id)}>
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="max-h-96 space-y-1 overflow-y-auto p-2">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  {contacts.length === 0 ? 'No contacts found' : 'No contacts match your search.'}
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50 ${selectedContact?.id === contact.id ? 'bg-muted' : ''
                      }`}
                  >
                    <div className="relative">
                      <Avatar className="size-12">
                        {contact.image && <AvatarImage src={contact.image} alt={contact.name} />}
                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                          {getUserInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{contact.name}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="flex flex-1 flex-col">
          {selectedContact ? (
            <>
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="size-10">
                        {selectedContact.image && <AvatarImage src={selectedContact.image} alt={selectedContact.name} />}
                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
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

              <CardContent className="flex flex-1 flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {(
                      messages
                        .filter((message) =>
                          (message.sender_id === user?.id && message.receiver_id === selectedContact.contact_id) ||
                          (message.sender_id === selectedContact.contact_id && message.receiver_id === user?.id)
                        )
                        .map((message) => {
                        const isOwn = message.sender_id === user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex max-w-xs items-end gap-2 lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'
                              }`}>
                              {!isOwn && (
                                <Avatar className="size-6">
                                  {selectedContact.image && <AvatarImage src={selectedContact.image} alt={selectedContact.name} />}
                                  <AvatarFallback className="bg-muted text-xs">
                                    {getUserInitials(selectedContact.name)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className={`rounded-2xl px-4 py-2 ${isOwn
                                ? 'rounded-br-md bg-primary text-primary-foreground'
                                : 'rounded-bl-md bg-muted'
                                }`}>
                                <p className="text-sm">{message.content}</p>
                                <p className="mt-1 text-xs opacity-70">
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

                <div className="border-t bg-background p-4">
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
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users className="mx-auto mb-4 size-16 opacity-50" />
                <p className="text-lg font-semibold">Choose a contact</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
