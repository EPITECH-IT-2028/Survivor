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

export function MobilMessagesStartup() {
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
    <div className="flex flex-col w-full px-4 my-10 mx-auto">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <UserPlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="mb-2"
              />
              {searchingUsers ? (
                <div>Searching...</div>
              ) : (
                searchResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={result.image || undefined} alt={result.name} />
                        <AvatarFallback>{getUserInitials(result.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-muted-foreground">{result.email}</p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => addContact(result.id)}>Add</Button>
                  </div>
                ))
              )}
              {userSearch && searchResults.length === 0 && !searchingUsers && (
                <div>No users found.</div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex flex-col w-full h-20">
        <CardHeader className="p-0">
          <div className="flex items-center p-4 border-b">
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
