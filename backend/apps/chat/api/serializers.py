from rest_framework import serializers

from apps.chat.models import Chat, Message


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["id", "timestamp"]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["sender", "content", "timestamp"]
