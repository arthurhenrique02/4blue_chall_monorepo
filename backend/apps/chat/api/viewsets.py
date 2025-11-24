from datetime import datetime, timedelta

from django.shortcuts import get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.chat.api.serializers import ChatHistorySerializer, MessageSerializer
from apps.chat.models import Chat, Message


class ChatsHistoryReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Chat.objects.all()
    serializer_class = ChatHistorySerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by("-timestamp")


class MessageReadCreateViewSet(
    mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        return self.queryset.filter(chat__user=self.request.user).order_by("-timestamp")

    def create(self, request, *args, **kwargs):
        msg = request.data.get("message", "")
        chat_id = self.request.data.get("chat_id")

        if not msg.strip():
            return Response(
                {"error": "Message cannot be empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if chat_id:
            chat = get_object_or_404(Chat, id=chat_id, user=self.request.user)
        else:
            chat = Chat.objects.create(user=self.request.user, timestamp=datetime.now())

        messages = Message.objects.bulk_create(
            [
                Message(
                    chat=chat,
                    message=msg,
                    sender="U",
                    timestamp=datetime.now(),
                ),
                Message(
                    chat=chat,
                    message="This is a placeholder response from the system.",
                    sender="S",
                    timestamp=datetime.now() + timedelta(seconds=1),
                ),
            ]
        )

        serializer = self.get_serializer(data=messages)
        serializer.is_valid(raise_exception=True)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"chat_id": chat.id, "messages": serializer.data},
            headers=headers,
            status=status.HTTP_201_CREATED,
        )

    # TODO: enable list to show messages for a particular chat uuid
    def list(self, request, chat_id, *args, **kwargs):
        return super().list(request, *args, **kwargs)
