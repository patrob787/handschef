"""updated subitem model, added menu_cat column

Revision ID: 1cb8bf217d46
Revises: 13cd17b02373
Create Date: 2023-06-16 12:09:29.882691

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1cb8bf217d46'
down_revision = '13cd17b02373'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('menu_cat', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.drop_column('menu_cat')

    # ### end Alembic commands ###