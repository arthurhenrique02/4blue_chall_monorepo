from apps.chat.models import Chat, Message
from rest_framework import serializers


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["id", "user", "timestamp"]

    messages = serializers.SerializerMethodField()


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["sender", "content", "timestamp"]
