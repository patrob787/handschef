"""deleted image from subitems

Revision ID: 43e1b3d879e8
Revises: 971f1146c8db
Create Date: 2023-06-15 13:46:02.372696

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43e1b3d879e8'
down_revision = '971f1146c8db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
