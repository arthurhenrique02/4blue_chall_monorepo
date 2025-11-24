from uuid import uuid4

from django.db import models


class Chat(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid4, editable=False, db_index=True
    )
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat from {self.user.username} at {self.timestamp}"


class Message(models.Model):
    sender_choices = [
        ("U", "User"),
        ("B", "Bot"),
    ]

    chat = models.ForeignKey(
        Chat, related_name="messages", on_delete=models.CASCADE, db_index=True
    )
    sender = models.CharField(max_length=1, choices=sender_choices)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} at {self.timestamp}"
