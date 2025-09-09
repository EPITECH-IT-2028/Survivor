export async function insertContact(userId: number, contactId: number): Promise<boolean> {
  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        contactId: contactId,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error('Error adding contact:', error);
    return false;
  }
}
