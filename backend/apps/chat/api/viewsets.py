from rest_framework import mixins, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from apps.chat.api.serializers import ChatHistorySerializer
from apps.chat.models import Chat


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

    queryset = Chat.objects.all()
    serializer_class = ChatHistorySerializer

    def get_queryset(self):
        return self.queryset.filter(chat__user=self.request.user).order_by("-timestamp")

    # TODO: def post to check if any chat uuid exists, if not create a new chat
    # TODO: enable list to show messages for a particular chat uuid
